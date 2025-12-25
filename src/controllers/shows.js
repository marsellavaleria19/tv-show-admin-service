const dataSyncService = require("../service/tvShow");
const Sequelize = require("sequelize");
const dateFormat = require('date-fns')
const Shows = require("../models/shows");
const Categories = require("../models/categories");

exports.getAllShows = async (req, res) => {
  try {
    const {
      search = "",
      category = "",
      date = "",
      sortBy = "",
      order = "",
    } = req.query;
    const sortField = sortBy || "createdAt";
    const sortDirection = order === "ASC" ? "ASC" : "DESC";

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const whereClause = {};

    if (search) {
      whereClause[Sequelize.Op.or] = [
        {
          id_show: {
            [Sequelize.Op.like]: `%${search}%`,
          },
        },
        {
          name_show: {
            [Sequelize.Op.like]: `%${search}%`,
          },
        },
      ];
    }

    if (category) {
      whereClause.categoryId = category;
    }

    if (date) {
      whereClause.premier_at = date;
    }

    const results = await Shows.findAndCountAll({
      where: {
        last_synced_at: null,
        ...whereClause,
      },
      include: [
        {
          model: Categories,
          attributes: ["id", "name"],
        },
      ],
      distinct: true,
      limit,
      offset,
      order: [[sortField, sortDirection]],
    });
    return res.json({
      success: true,
      message: "List all shows",
      data: results.rows,
      meta: {
        totalData: results.count,
        totalPages: Math.ceil(results.count / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Unexpected Error",
    });
  }
};

exports.createShows = async (req, res) => {
  try {
    const shows = await Shows.create(req.body);
    return res.send({
      success: true,
      message: "Shows created!",
      results: shows,
    });
  } catch (e) {
    return res.status(400).send({
      success: false,
      message: "Error",
      results: e.errors.map((err) => ({
        field: err.path,
        message: err.message,
      })),
    });
  }
};

exports.updateShows = async (req, res) => {
  const { id } = req.params;
  const shows = await Shows.findByPk(id);
  if (shows) {
    for (let key in req.body) {
      shows[key] = req.body[key];
    }
    await shows.save();
    return res.send({
      success: true,
      message: "Shows updated!",
      results: shows,
    });
  } else {
    return res.status(404).send({
      success: false,
      message: "Shows not found!",
    });
  }
};

exports.detailShow = async (req, res) => {
  const { id } = req.params;
  const shows = await Shows.findByPk(id, {
    include: [
      {
        model: Categories,
        attributes: ["id", "name"],
      },
    ],
  });
  if (shows) {
    return res.send({
      success: true,
      message: "Show Detail",
      data: shows,
    });
  } else {
    return res.status(404).send({
      success: false,
      message: "Show not found!",
    });
  }
};

exports.deleteShow = async (req, res) => {
  const { id } = req.params;
  const show = await Shows.findByPk(id);
  if (show) {
    await show.destroy();
    return res.send({
      success: true,
      message: "Show Deleted!",
    });
  } else {
    return res.status(404).send({
      success: false,
      message: "Show not found!",
    });
  }
};

exports.syncShows = async (req, res) => {
  try {
    // GET DATA CATEGORY
    const allCategories = await Category.findAll();
    const categoryMap = {};
    allCategories.forEach((item) => {
      categoryMap[item.name] = item.id;
    });

    // MAPPING
    const dataApi = await dataSyncService.fetchShowFromApi();
    const dataMapping = dataApi.map((item, index) => {
      return {
        id_show: `SYNC000${index + 1}`,
        name_show: item.name,
        premier_at: item.premiered,
        description: item.summary,
        last_synced_at: new Date(),
        categoryId: categoryMap[item.type],
      };
    });

    // SYNC
    const response = await Shows.bulkCreate(dataMapping, {
      updateOnDuplicate: [
        "id_show",
        "name_show",
        "premier_at",
        "last_synced_at",
        "categoryId",
      ],
    });

    return res.send({
      success: true,
      message: "Sinkronisasi data berhasil!",
      results: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Unexpected Error",
    });
  }
};

exports.getAllSyncShows = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const results = await Shows.findAndCountAll({
      where: {
        last_synced_at: {
          [Sequelize.Op.not]: null,
        },
      },
      include: [
        {
          model: Categories,
          attributes: ["id", "name"],
        },
      ],
      distinct: true,
      limit,
      offset,
      order: [["last_synced_at", "DESC"]],
    });

    return res.json({
      success: true,
      message: "List all shows",
      data: results.rows,
      meta: {
        totalData: results.count,
        totalPages: Math.ceil(results.count / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Unexpected Error",
    });
  }
};

exports.getLastSync = async (req, res) => {
  try{
 const latestData = await Shows.findOne({
    order: [['updatedAt', 'DESC']],
  });
  
  res.json({ last_synced_at: latestData ? latestData.last_synced_at : null });
  }
  catch(error){
     console.log(error);
    return res.status(400).json({
      success: false,
      message: "Unexpected Error",
    });
  }
 
};

exports.countDataDasboard = async (req, res) => {
  const startDate = req.query.startDate || dateFormat.subMonths(new Date(),1);
  const endDate = req.query.endDate || new Date();

  console.log(startDate,endDate)

  try {
    const resultCountCategory = await Shows.findAll({
      attributes: [
        [Sequelize.col("category.name"), "category"],
        [Sequelize.fn("COUNT", Sequelize.col("shows.id")), "total"],
      ],
      where: {
        premier_at: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: Categories,
          attributes: [],
        },
      ],
      group: ["category.name"],
      raw: true,
    });

    const resultCountPremierDate = await Shows.findAll({
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("premier_at")), "date"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "total"],
      ],
      where: {
        premier_at: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
      },
      group: [Sequelize.literal('DATE(`premier_at`)')],
    });

    const resultCountAllData = await Shows.count({
      where: {
        premier_at: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
      },
    });
    return res.json({
      success: true,
      message: "Count Data",
      data: {
        byCategory: resultCountCategory,
        byPremierDate: resultCountPremierDate,
        totalData:resultCountAllData
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Unexpected Error",
    });
  }
};
