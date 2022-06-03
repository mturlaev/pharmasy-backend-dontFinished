const Cart = require("../models/Cart.Model");
const Client = require("../models/Client.model");
const Medicine = require("../models/Medicine.model");

module.exports.cartsController = {
  patchMedicineByCart: async (req, res) => {
    try {
      const medicine = await Medicine.findById(req.body.medicineId);
      const cart = await Cart.findById(req.params.id);
      const client = await Client.findById(cart.clientId);

      if (medicine.recept === true) {
        if (client.hasRecept === true) {
          await Cart.findByIdAndUpdate(req.params.id, {
            $push: {
              medicineId: req.body.medicineId,
            },
            summa: cart.summa + medicine.price
          });
          res.json("добавлено в корзину");
        } else {
          res.json(" у вас нет рецепта");
        }
      } else {
        await Cart.findByIdAndUpdate(req.params.id, {
          $push: {
            medicineId: req.body.medicineId,
          },
          summa: cart.summa + medicine.price
        });
        res.json("добавлено в корзину");
      }
    } catch (error) {
      res.json(error.message);
    }
  },
  getCart: async (req, res) => {
    try {
      const cart = await Cart.find().populate("medicineId").populate("clientId");
      res.json(cart);
    } catch (error) {
      res.json(error.message)
    }
  },
  //удалить из корзины
  deleteMedicineIdByCart: async (req, res) => {
    try {
      const medicine = await Medicine.findById(req.body.medicineId);
      const cart = await Cart.findById(req.params.id);
      const client = await Client.findById(cart.clientId);
      await Cart.findByIdAndUpdate(req.params.id, {
        $pull: {
          medicineId: req.body.medicineId
        },
        summa: cart.summa - medicine.price
      });
      res.json("удалено из корзины")
    } catch (error) {
      res.json(error.message)
    }
  },
  // очистка корзины
  deleteByCarts: async (req, res) => {
    try {
      const cart = await Cart.findByIdAndUpdate(req.params.id, {
        medicineId: null,
        summa: null,
      });
      res.json(cart)
    } catch (error) {
      res.json(error.message)
    }
  }
};


