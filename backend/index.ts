// npx ts-node index.ts
import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

async function main(){
    // Create User
    const user = await prisma.user.Create({
        data:{
            isAdmin: true,
            name: 'John Daoutis',
            pass: 1234,
        }
    })
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async(e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

export default prisma;