import PageHeader from "../components/PageHeader";
function LandingPage() {
  return (
    <div className="bg-gray-600 h-screen">
      <PageHeader onLoginPage={false} />
    </div>
  );
}
export default LandingPage;
