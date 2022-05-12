const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  // Listar todos os registros
  async index(req, res) {
    const contacts = await ContactRepository.findAll();
    res.json(contacts);
  }

  // Obter um registro
  async show(req, res) {
    const { id } = req.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) return res.status(404).json({ error: 'user not found' });
    res.json(contact);
  }

  // Criar novo registro
  async store(req, res) {
    const {
      name, email, phone, category_id,
    } = req.body;

    if (!name) res.status(400).json({ error: 'name is required' });

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) res.status(400).json({ error: 'this email already in use' });

    const contact = await ContactRepository.create({
      name, email, phone, category_id,
    });

    res.json(contact);
  }

  // Editar um registro
  async update(req, res) {
    const { id } = req.params;
    const {
      name, email, phone, category_id,
    } = req.body;

    const contactExists = await ContactRepository.findById(id);
    if (!contactExists) res.status(400).json({ error: 'user not found' });

    if (!name) res.status(400).json({ error: 'name is required' });

    const emailHasBeenTaken = await ContactRepository.findByEmail(email);

    if (emailHasBeenTaken && emailHasBeenTaken.id !== id) res.status(400).json({ error: 'this email already in use' });

    const contact = await ContactRepository.update(id, {
      name, email, phone, category_id,
    });

    res.json(contact);
  }

  // Deletar um registro
  async delete(req, res) {
    const { id } = req.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) return res.status(400).json({ error: 'user not found' });

    await ContactRepository.delete(id);
    res.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
