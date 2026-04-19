export const getStatusColor = (status: string) => {
  switch (status) {
    case "pass":
      return "success.main"; // ירוק של ה-Theme
    case "fail":
      return "error.main"; // אדום של ה-Theme
    case "in-progress":
      return "secondary.dark"; // כחול של ה-Theme
    default:
      return "text.secondary"; // אפור ברירת מחדל
  }
};

// const getStatusLabel = (status: string) => {
//   const labels: Record<string, string> = {
//     "in-progress": "In Progress",
//     pass: "Pass",
//     fail: "Fail",
//     pending: "Pending",
//   };
//   return labels[status] || status;
// };
