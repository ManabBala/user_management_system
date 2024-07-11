import UsersTable from "./pages/home/UsersTable";

export default function App() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col max-w-6xl p-4 space-y-6">
        <h1 className="text-3xl font-bold underline text-center">
          User Management System
        </h1>
        <UsersTable />
      </div>
    </div>
  );
}
