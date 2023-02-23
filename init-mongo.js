db = db.getSiblingDB('PokeClash')

db.createUser({
    user: 'mongo',
    pwd: 'mongo',
    roles: [
      {
        role: 'readWrite',
        db: 'PokeClash'
      },
    ]
  })
  
