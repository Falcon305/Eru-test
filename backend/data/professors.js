import bcrypt from 'bcryptjs'

const professors = [
  {
    firstName: 'Hatim',
    lastName: 'Razani',
    email: 'hatim@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default professors