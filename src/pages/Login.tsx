import PageHeader from "../components/PageHeader";
function Login(props: any) {
  return (
    <div className=" h-screen bg-gray-600 w-full">
      <PageHeader onLoginPage={true} />
    </div>
  );
}
export default Login;
