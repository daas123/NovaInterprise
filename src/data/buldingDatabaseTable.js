import createUserTable from "./createUserTable.js"
import createExpenceTable from "./createExpenceTable.js";
import createFlatTable from "./createFlatTable.js";
import createMaintainaenceRecordTable from "./createMaintainaenceRecordTable.js";
import createMonthlyExpenceTable from "./createMonthlyExpenceTable.js";

const createBuildingDatabaseTable = async () => {
  try {
    console.log("🔧 Creating building database tables...");
    await createUserTable();
    await createFlatTable();
    await createMonthlyExpenceTable();
    await createExpenceTable();
    await createMaintainaenceRecordTable();
    console.log("✅ All tables created successfully.");
  } catch (error) {
    console.error("❌ Error setting up building database schema:", error);
  }
};

export default createBuildingDatabaseTable;