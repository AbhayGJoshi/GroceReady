import bcrypt from "bcrypt";

async function practice() {
  const password = "abc123";
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(hashedPassword);
}

practice();
