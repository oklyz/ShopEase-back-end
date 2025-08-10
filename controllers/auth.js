const User = require('../models/user')
const middleware = require('../middlewares')

const Register = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body
    // let { email, image, password, name, role } = req.body
    let { email, password, name } = req.body
    // Hashes the provided password
    let passwordDigest = await middleware.hashPassword(password)
    // Checks if there has already been a user registered with that email
    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .send('A user with that email has already been registered!')
    } else {
      // Creates a new user
      // const user = await User.create({
      //   name,
      //   image,
      //   email,
      //   passwordDigest,
      //   role
      // })
      const user = await User.create({
        name,
        email,
        passwordDigest,
      })

      // Sends the user as a response

      res.send(user)
    }
  } catch (error) {
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred!',
      error: error.message
    })
  }
}

const Login = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body
    const { email, password } = req.body
    // Finds a user by a particular field (in this case, email)
    const user = await User.findOne({ email })
    // Checks if the password matches the stored digest
    let matched = await middleware.comparePassword(
      password,
      user.passwordDigest
    )
    // If they match, constructs a payload object of values we want on the front end
    if (matched) {
      let payload = {
        id: user._id,
        email: user.email,
        role: user.role
      }
      // Creates our JWT and packages it with our payload to send as a response
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred!',
      error: error.message
    })
  }
}

const user_info_get = async (req, res) => {
  try {
    const user_info = await User.findById(req.params.id).populate('addresses')
    if (!user_info) {
      return res.status(404).send({ status: 'Error', msg: 'User not found' })
    }
    res.status(200).send(user_info)
  } catch (error) {
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred!',
      error: error.message
    })
  }
}
const user_update_put = async (req, res) => {
  try {
    const { name, email, image, addresses, password } = req.body
    const passwordDigest = await middleware.hashPassword(password)
    const updateData = { name, email, image, addresses, passwordDigest }

    const user_update = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    )

    if (!user_update) {
      return res.status(404).send({ status: 'Error', msg: 'User not found' })
    }

    res.status(200).send(user_update)
  } catch (error) {
    res
      .status(400)
      .send({ status: 'Error', msg: 'Update failed', error: error.message })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.status(200).send(payload)
}

module.exports = {
  Register,
  Login,
  user_info_get,
  user_update_put,
  CheckSession
}
