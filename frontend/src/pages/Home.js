import "mdb-react-ui-kit/dist/css/mdb.min.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText
} from "mdb-react-ui-kit";

const Home = () => {
  return (
    <MDBContainer className="d-flex justify-content-center align-items-center vh-100">
      <MDBRow className="w-100">
        <MDBCol md="8" lg="6" className="mx-auto">
          <MDBCard className="text-center shadow-4-strong p-4" style={{ borderRadius: "20px" }}>
            <MDBCardBody>
              <MDBCardTitle className="mb-3 fw-bold">Welcome to My Website</MDBCardTitle>
              <MDBCardText className="mb-4 text-muted">
                Connect, explore, and enjoy!
              </MDBCardText>

              <div className="d-flex justify-content-center gap-3">
                <MDBBtn href="/login" color="primary">
                  Login
                </MDBBtn>
                <MDBBtn href="/signup" outline color="primary">
                  Sign Up
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Home;
