import Property from '../models/Property.js';

async function getAll(req, res) {
  try {
    const { sort, page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    let sortOption = { createdAt: -1 };

    if (sort === 'price_desc') {
      sortOption = { price: -1 };
    } else if (sort === 'price_asc') {
      sortOption = { price: 1 };
    }

    const properties = await Property.find()
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);
    return res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json('Server error');
  }
}

async function getById(req, res) {
  try {
    const property = await Property.findOne({ _id: req.params.id });
    return res.status(200).json(property);
  } catch (error) {
    return res.status(500).json('Server error');
  }
}

async function count(req, res) {
  try {
    const totalProperties = await Property.countDocuments();
    return res.status(200).json(totalProperties);
  } catch (error) {
    return res.status(500).json('Server error');
  }
}

async function create(req, res) {
  try {
    const {
      address,
      title,
      description,
      location,
      images,
      type,
      status,
      isActive,
      price,
      area,
      owner,
    } = req.body;
    const newProperty = await Property.create({
      address,
      title,
      description,
      location,
      images,
      type,
      status,
      isActive,
      price,
      area,
      owner,
    });
    return res.status(201).json(newProperty);
  } catch (error) {
    return res.status(500).json('Server error');
  }
}

async function update(req, res) {}

async function destroy(req, res) {
  try {
    const propertyToDestroy = await Property.deleteOne({ _id: req.params.id });
    return res.json('Property deleted');
  } catch (err) {
    return res.status(500).json('Server error');
  }
}

export default { getAll, getById, count, create, update, destroy };
