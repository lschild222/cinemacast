import CreditForm from "./CreditForm";


function CreditCreatePage() {
  return (
    <>
      <nav className="d-flex justify-content-between">
        <h4>New Credit</h4>
      </nav>
      <hr />
      <CreditForm />
    </>
  );
}

export default CreditCreatePage;
