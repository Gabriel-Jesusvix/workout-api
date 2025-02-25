import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repoitory"
import { RegisterUseCase } from "../register"

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}