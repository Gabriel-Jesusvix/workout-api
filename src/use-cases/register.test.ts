import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register'

let sut: RegisterUseCase
let usersRepository: InMemoryUsersRepository
describe('Register Use Case', () => {

  beforeEach(() => {
     usersRepository = new InMemoryUsersRepository()
     sut = new RegisterUseCase(usersRepository)

  })
  it('should to register', async () => {
    

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password up on registragion', async () => {
    

    const { user } = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      password: '123456'
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  it('should not be able to register with same email twice', async () => {
    

    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})