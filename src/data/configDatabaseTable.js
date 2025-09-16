import createCommentsTable from "./commentsTables.js";
import createLikesTable from "./likesTables.js";
import createPostTables from "./postTables.js";
import createUserTables from "./userTables.js"

const createBuildingDatabaseTable = async () => {
  try {
    console.log("🔧 Creating building database tables...");
     await createUserTables();
    await createPostTables();
    await createCommentsTable();
    await createLikesTable();

    console.log("✅ All tables created successfully.");
  } catch (error) {
    console.error("❌ Error setting up building database schema:", error);
  }
};

export default createBuildingDatabaseTable;