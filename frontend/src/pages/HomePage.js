import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBTypography
} from 'mdb-react-ui-kit';

function HomePage() {
  const [showNav, setShowNav] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [selectedPage, setSelectedPage] = useState('home'); // track active nav item

  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    const fetchUser = async () => {
      if (!email) return;
      try {
        const response = await fetch("http://localhost:4000/api/users/get-user-by-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [email]);

  const navItems = [
    { label: 'Home', key: 'home', roles: ['admin', 'staff'] },
    { label: 'Orders', key: 'orders', roles: ['admin', 'staff'] },
    { label: 'Inventory', key: 'inventory', roles: ['admin', 'staff'] },
    { label: 'Pricing', key: 'pricing', roles: ['admin'] },        // Admin only
    { label: 'Reports', key: 'reports', roles: ['admin'] },        // Admin only
    { label: 'Staff Management', key: 'staff', roles: ['admin'] }, // Admin only
  ];

  return (
    <>
      {/* 🟩 NAVBAR */}
      <MDBNavbar expand='lg' style={{ backgroundColor: '#A78D79' }}>
        <MDBContainer fluid className='d-flex justify-content-between align-items-center'>
          
          {/* LEFT SIDE: Brand */}
          <MDBNavbarBrand
            href='#'
            className='d-flex align-items-center custom-font'
            style={{ color: 'white' }}
          >
            Krizkhen Floral Design
          </MDBNavbarBrand>

          {/* RIGHT SIDE: Nav Links */}
          <div className='d-flex align-items-center'>
            <MDBNavbarToggler
              type='button'
              aria-controls='navbar'
              aria-expanded='false'
              aria-label='Toggle navigation'
              onClick={() => setShowNav(!showNav)}
            >
              <MDBIcon icon='bars' fas style={{ color: 'white' }} />
            </MDBNavbarToggler>

            <MDBCollapse navbar show={showNav}>
              <MDBNavbarNav className='ms-auto d-flex flex-row gap-3 align-items-center'>
                {user &&
                  navItems
                    .filter(item => item.roles.includes(user.role))
                    .map(item => (
                      <MDBNavbarItem key={item.key}>
                        <MDBNavbarLink
                          onClick={() => setSelectedPage(item.key)}
                          style={{
                            color: 'white',
                            textDecoration:
                              selectedPage === item.key ? 'underline' : 'none',
                            textUnderlineOffset: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          {item.label}
                        </MDBNavbarLink>
                      </MDBNavbarItem>
                    ))}
              </MDBNavbarNav>
            </MDBCollapse>
          </div>
        </MDBContainer>
      </MDBNavbar>

      {/* 🟦 MAIN CONTENT */}
      <MDBContainer
        fluid
        className='d-flex align-items-center justify-content-center'
        style={{ height: '90vh' }}
      >
        <MDBRow>
          <MDBCol className='text-center'>
            {error ? (
              <MDBTypography tag='p' className='text-danger'>
                Error: {error}
              </MDBTypography>
            ) : !user ? (
              <MDBTypography tag='p' className='lead' style={{ color: '#6c757d' }}>
                Loading user...
              </MDBTypography>
            ) : (
              <>
                {/* Home Page */}
                {selectedPage === 'home' && (
                  <>
                    <MDBTypography
                      tag='h1'
                      className='display-3 fw-bold'
                      style={{ color: '#A78D79' }}
                    >
                      Hello 👋 {user.name}
                    </MDBTypography>
                    <MDBTypography tag='p' className='lead' style={{ color: '#6c757d' }}>
                      Welcome back, {user.email}!
                    </MDBTypography>
                  </>
                )}

                {/* Orders Page */}
                {selectedPage === 'orders' && (
                  <>
                    <MDBTypography
                      tag='h2'
                      className='fw-bold'
                      style={{ color: '#A78D79' }}
                    >
                      Orders
                    </MDBTypography>
                    <MDBTypography
                      tag='p'
                      className='lead'
                      style={{ color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}
                    >
                      Manage your orders here. Staff can view and update fixed orders.
                      Admin can also create custom orders.
                    </MDBTypography>
                  </>
                )}

                {/* Inventory Page */}
                {selectedPage === 'inventory' && (
                  <>
                    <MDBTypography
                      tag='h2'
                      className='fw-bold'
                      style={{ color: '#A78D79' }}
                    >
                      Inventory
                    </MDBTypography>
                    <MDBTypography
                      tag='p'
                      className='lead'
                      style={{ color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}
                    >
                      View inventory availability, stock levels, and reserved quantities.
                    </MDBTypography>
                  </>
                )}

                {/* Pricing Page (Admin only) */}
                {selectedPage === 'pricing' && user.role === 'admin' && (
                  <>
                    <MDBTypography
                      tag='h2'
                      className='fw-bold'
                      style={{ color: '#A78D79' }}
                    >
                      Pricing
                    </MDBTypography>
                    <MDBTypography
                      tag='p'
                      className='lead'
                      style={{ color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}
                    >
                      Adjust product prices and manage price settings.
                    </MDBTypography>
                  </>
                )}

                {/* Reports Page (Admin only) */}
                {selectedPage === 'reports' && user.role === 'admin' && (
                  <>
                    <MDBTypography
                      tag='h2'
                      className='fw-bold'
                      style={{ color: '#A78D79' }}
                    >
                      Reports
                    </MDBTypography>
                    <MDBTypography
                      tag='p'
                      className='lead'
                      style={{ color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}
                    >
                      View sales and inventory reports.
                    </MDBTypography>
                  </>
                )}

                {/* Staff Management Page (Admin only) */}
                {selectedPage === 'staff' && user.role === 'admin' && (
                  <>
                    <MDBTypography
                      tag='h2'
                      className='fw-bold'
                      style={{ color: '#A78D79' }}
                    >
                      Staff Management
                    </MDBTypography>
                    <MDBTypography
                      tag='p'
                      className='lead'
                      style={{ color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}
                    >
                      Manage staff users and their access levels.
                    </MDBTypography>
                  </>
                )}
              </>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default HomePage;
