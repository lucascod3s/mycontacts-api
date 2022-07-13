const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  // Listar todos os registros
  async index(req, res) {
    const categories = await CategoriesRepository.findAll();

    res.json(categories);
  }

  // Obter um registro
  async show(req, res) {
    const { id } = req.params;
    const category = await CategoriesRepository.findById(id);

    if (!category) return res.status(404).json({ error: 'category not found' });
    res.json(category);
  }

  // Criar novo registro
  async store(req, res) {
    const { name } = req.body;

    if (!name) res.status(400).json({ error: 'name is required' });

    const category = await CategoriesRepository.create({ name });

    res.json(category);
  }

  // Deletar um registro
  async delete(req, res) {
    const { id } = req.params;

    await CategoriesRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new CategoryController();
