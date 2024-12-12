// app.js
import { getDb, Search , addUser } from './database.mjs';

const main = async () => {
  // const user = await Search(917404799807);
  // console.log(user);
  addUser({ id: 917404799807, name: 'Kunal Chauhan' });
};

main();
