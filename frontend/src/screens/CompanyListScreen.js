import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listCompanies, deleteCompany } from '../actions/companyActions';
import NumFormat from '../components/NumFormat';

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const companyList = useSelector((state) => state.companyList);
  const { loading, error, companies } = companyList;

  const companyDelete = useSelector((state) => state.companyDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = companyDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listCompanies());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCompany(id));
    }
  };

  const createCompanyHandler = (company) => {
    //create company
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Companies</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createCompanyHandler}>
            <i className='fas fa-plus'></i> Create Company
          </Button>
        </Col>
      </Row>
      <h1>Companies</h1>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th className='p-1'>
                <h5 className='m-0 text-center'>Name</h5>
              </th>
              <th className='p-1'>
                <h5 className='m-0 text-center'>Ticker</h5>
              </th>
              <th className='p-1'>
                <h5 className='m-0 text-center'>MCap</h5>
              </th>
              <th className='p-1'>
                <h5 className='m-0 text-center'>Commodity</h5>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company._id}>
                <td className='p-2'>{company.name}</td>
                <td className='p-2'>
                  {company.trading.exchange}:{company.trading.ticker}
                </td>
                <td className='p-2'>
                  {company.trading.currency}
                  <NumFormat number={company.trading.mcap} dp='2' />
                </td>
                <td className='p-2'>{company.primaryCommodity}</td>
                <td>
                  <LinkContainer to={`/admin/company/${company._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(company._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
