interface Request {
  name: string,
  email: string,
  identity: string,
  username: string,
  password: string
}

const database: any[] = []


function checkUserExists(name: string, email: string, identity: string, username: string) {
  return database.map(param => {
    if (param.name == name || param.email == email || param.identity == identity || param.username == username) {
      return true
    }
    return false
  })
}

export default class CreateUserService {
  public execute({ name, email, identity, username, password }: Request) {
    if (checkUserExists(name, email, identity, username)) {
      return console.log('User already exists')
    }

    var new_User = {
      name: name,
      email: email,
      identity: identity,
      username: username,
      password: password
    }

    database.push(new_User)
    return new_User
  }
}
