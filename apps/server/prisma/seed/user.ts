import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt';

export const user = async (prisma: Prisma.TransactionClient) => {
    await prisma.rUser.createMany({
        data: [
            {
                email: 'test1@test.com',
                password: hashSync('password', 10),
                firstName: '太郎',
                lastName: '田中',
                gender: 'MALE',
                age: 25
            },
            {
                email: 'test2@test.com',
                password: hashSync('password', 10),
                firstName: '花子',
                lastName: '山田',
                gender: 'FEMALE',
                age: 25
            },
            {
                email: 'test3@test.com',
                password: hashSync('password', 10),
                firstName: '次郎',
                lastName: '佐藤',
                gender: 'MALE',
                age: 25
            },
        ]
    })
}