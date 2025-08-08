const User = require('../models/user')
const middleware = require('../middlewares')

const user_info_get = async (req, res) => {
  try {
    const user_info = await User.findById(req.params.id)
    res.status(200).send(user_info)
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}

module.exports = {
  user_info_get
}
