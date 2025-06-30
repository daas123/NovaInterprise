import createUserTable from "./userTable.js"
import { createExpenseMonthYearTrigger,createExpenceTable } from "./expenceTable.js";
import createFlatTable from "./flatTable.js";
import createMaintainaenceRecordTable from "./maintainaenceRecordTable.js";
import createMonthlyExpenceTable from "./monthlyExpenceTable.js";
// import createYearlyExpenceTable from "./yearlyExpenceTable.js";ç

const createBuildingDatabaseTable = async () => {
  try {
    console.log("🔧 Creating building database tables...");
    await createUserTable();
    await createFlatTable();
    await createMonthlyExpenceTable();
    await createExpenceTable();
    await createMaintainaenceRecordTable();
    // await createYearlyExpenceTable();
    await createExpenseMonthYearTrigger();
    console.log("✅ All tables created successfully.");
  } catch (error) {
    console.error("❌ Error setting up building database schema:", error);
  }
};

export default createBuildingDatabaseTable;