import Router from "express";



const database: ({ name: string; email: string; identity: string; username: string; password: string; })[] = []
const users = Router()

users.get('/', (request, response) => {
  response.status(202).json(database)
})

users.delete('/delete', (request, response) => {
  const id = request.body
  try {
    database.map(params => {
      let cont = 0
      if (params.username == id.id) {
        database.splice(cont, 1)
      }
      cont++
    })

    return response.status(200).json({ message: 'User deleted!' })
  } catch (error) {
    return response.status(404).json({ alert: error })
  }
})

users.post('/signup', (request, response) => {
  try {
    const { name, email, identity, username, password } = request.body
    var check = false;

    const user = {
      name: name,
      email: email,
      identity: identity,
      username: username,
      password: password
    }

    database.map(params => {
      if (params.name == name || params.email == email || params.identity == identity || params.username == username) {
        check = true
        return response.status(406).json({ alert: 'User alread exist!' })
      }
    })

    if (check) {
      return response.status(406).json({ alert: 'User alread exist!' })
    }
    database.push(user)
    return response.status(201).json(user)

  } catch (err) {
    console.log(err)
    return response.status(400).json(err)
  }
})

users.put('/edit', (request, response) => {
  try {
    const { username, newusername } = request.body

    database.map(data => {
      if (data.username === username) {
        data.username = newusername
      }
    })

    return response.json({ message: 'Alter' })
  } catch (err) {
    return response.status(400).json({ alert: err })
  }
})


export default users
