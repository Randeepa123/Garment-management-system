import React, { use, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"; 
import './JobCard.css'
import logo from '../../../asserts/img/logo.png'




function JobCard({
    addOrder,submitted}) {

    const [orderdate, setOrderdate] = React.useState("");
    const [deliverydate, setDeliverydate] = React.useState("");
    const [customer, setCustomer] = React.useState("");

    useEffect(() => {
        console.log("Status:", submitted)
        if(submitted==false){
            setOrderdate('');
            setDeliverydate('');    
            setCustomer('');

        }
    }, [submitted])

  return (
    <>
    <div class="container py-4">
        <div class="card shadow-sm">
            <div class="card-header bg-white py-4">
                <div class="row align-items-center">
                    <div class="col-md-auto mb-3 mb-md-0">
                        <div class="logo">
                        <img src={logo} alt="Company Logo"/>
                        </div>
                    </div>
                    <div class="col">
                        <h1 className= "Title" class="border-bottom fs-4 mb-1 pb-2">MANUFACTURING JOB CARD</h1>
                        <p className= "Title" class="text-muted mb-0 small">Track production from cutting to final quality check</p>
                    </div>
                    <div class="col-md-auto text-md-end mt-2 mt-md-0">
                        <div class="text-secondary fs-5 fw-bold">#GRM-2025-....</div>
                    </div>
                </div>
            </div>
            
            <div class="card-body border-bottom">
                <div class="g-3 row">
                    <div class="col-md-6">
                        <div class="detail-box">
                            <label>Order Date</label>
                            <div><input type="date"class="value"
                                value={orderdate}
                                onChange={(e) => {
                                    setOrderdate(e.target.value);
                                }}
                            /></div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="detail-box">
                            <label>Delivery Date</label>
                            <div ><input type="date"class="value"
                                value={deliverydate}
                                onChange={(e) => {
                                    setDeliverydate(e.target.value);
                                }}
                            /></div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="detail-box">
                            <label>Customer</label>
                            <div ><input type="text"class="value"
                                value={customer}
                                onChange={(e) => {
                                setCustomer(e.target.value);
                                }}
                            /></div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="detail-box">
                            <label>Priority</label>
                            <div ><input type="text"class="value"/></div>
                            
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="detail-box">
                            <label>Style Number</label>
                            <div ><input type="text"class="value"/></div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="detail-box">
                            <label>Total Quantity</label>
                            <div ><input type="text"class="value"/></div> 
                        </div>
                    </div>
                    
                    <div class="col-12">
                        <div class="detail-box">
                            <label>Description</label>
                            <div ><input type="text"class="value"/></div>
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <div class="detail-box">
                            <label>Fabric Details</label>
                            <div ><input type="text"class="value"/></div>
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <div class="detail-box">
                            <label>Color</label>
                            <div ><input type="text"class="value"/></div>
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <div class="detail-box">
                            <label>Size Range</label>
                            <div ><input type="text"class="value"/></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card-body border-bottom">
                <h2 class="border-bottom fs-5 mb-3 pb-2">Size Specification</h2>
                
                <h5 class="fs-6">Size Distribution</h5>
                <div class="table-responsive mb-3">
                    <table class="table table-bordered">
                        <thead class="table-light">
                            <tr>
                                <th>Size</th>
                                <th>S</th>
                                <th>M</th>
                                <th>L</th>
                                <th>XL</th>
                                <th>2XL</th>
                                <th>3XL</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Quantity</td>
                                <td>50</td>
                                <td>100</td>
                                <td>150</td>
                                <td>100</td>
                                <td>75</td>
                                <td>25</td>
                                <td>500</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <h5 class="fs-6">Size Measurements (in cm)</h5>
                <div class="table-responsive mb-3">
                    <table class="table table-bordered table-striped">
                        <thead class="table-light">
                            <tr>
                                <th>Measurement</th>
                                <th>S</th>
                                <th>M</th>
                                <th>L</th>
                                <th>XL</th>
                                <th>2XL</th>
                                <th>3XL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Chest Width</td>
                                <td>51</td>
                                <td>54</td>
                                <td>57</td>
                                <td>60</td>
                                <td>63</td>
                                <td>66</td>
                            </tr>
                            <tr>
                                <td>Body Length</td>
                                <td>71</td>
                                <td>73</td>
                                <td>75</td>
                                <td>77</td>
                                <td>79</td>
                                <td>81</td>
                            </tr>
                            <tr>
                                <td>Shoulder Width</td>
                                <td>44</td>
                                <td>46</td>
                                <td>48</td>
                                <td>50</td>
                                <td>52</td>
                                <td>54</td>
                            </tr>
                            <tr>
                                <td>Sleeve Length</td>
                                <td>21</td>
                                <td>22</td>
                                <td>23</td>
                                <td>24</td>
                                <td>25</td>
                                <td>26</td>
                            </tr>
                            <tr>
                                <td>Neck Width</td>
                                <td>19</td>
                                <td>20</td>
                                <td>21</td>
                                <td>22</td>
                                <td>23</td>
                                <td>24</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="detail-box">
                    <label>Measurement Notes</label>
                    <div class="value">All measurements are finished garment measurements. Tolerance: ±1cm. Wash care instructions: Machine wash cold, do not bleach, tumble dry low.</div>
                </div>
            </div>
            
            <div class="card-body border-bottom">
                <h2 class="border-bottom fs-5 mb-3 pb-2">T-Shirt Design</h2>
                <div class="g-4 row">
                    <div class="col-md-6">
                        <div class="card h-100">
                            <h5 class="card-header text-center fs-6">Front View</h5>
                            <div class="card-body">
                                <div class="image-placeholder mb-3">
                                    <img src="/api/placeholder/400/320" alt="T-shirt Front Design"/>
                                </div>
                                <div class="detail-box">
                                    <label>Front Design Notes</label>
                                    <div class="value">Centered graphic with company logo, 25cm x 20cm print area</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card h-100">
                            <h5 class="card-header text-center fs-6">Back View</h5>
                            <div class="card-body">
                                <div class="image-placeholder mb-3">
                                    <img src="/api/placeholder/400/320" alt="T-shirt Back Design"/>
                                </div>
                                <div class="detail-box">
                                    <label>Back Design Notes</label>
                                    <div class="value">Small logo at upper back, 10cm x 5cm print area</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card-body border-bottom">
                <h2 class="border-bottom fs-5 mb-3 pb-2">Production Tracking</h2>
                <div class="table-responsive">
                    <table className='table' class="table table-bordered table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>Process</th>
                                <th>Department</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Supervisor</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pattern Making</td>
                                <td>Design</td>
                                <td><input type="date"class="value"/></td>
                                <td><input type="date"class="value"/></td>
                                <td><input type="text"class="value"/></td>
                                <td><input type="text"class="value"/></td>
                            </tr>
                            <tr>
                                <td>Cutting</td>
                                <td>Cutting</td>
                                <td><input type="date"class="value"/></td>
                                <td><input type="date"class="value"/></td>
                                <td><input type="text"class="value"/></td>
                                <td><input type="text"class="value"/></td>
                            </tr>
                            <tr>
                                <td>Printing</td>
                                <td>Print Shop</td>
                                <td><input type="date"class="value"/></td>
                                <td><input type="date"class="value"/></td>
                                <td><input type="text"class="value"/></td>
                                <td><input type="text"class="value"/></td>
                            </tr>
                            <tr>
                                <td>Sewing</td>
                                <td>Production</td>
                                <td><input type="date"class="value"/></td>
                                <td><input type="date"class="value"/></td>
                                <td><input type="text"class="value"/></td>
                                <td><input type="text"class="value"/></td>
                            </tr>
                            <tr>
                                <td>Finishing</td>
                                <td>Finishing</td>
                                <td><input type="date"class="value"/></td>
                                <td><input type="date"class="value"/></td>
                                <td><input type="text"class="value"/></td>
                                <td><input type="text"class="value"/></td>
                            </tr>
                            <tr>
                                <td>Quality Control</td>
                                <td>QC</td>
                                <td><input type="date"class="value"/></td>
                                <td><input type="date"class="value"/></td>
                                <td><input type="text"class="value"/></td>
                                <td><input type="text"class="value"/></td>
                            </tr>
                            <tr>
                                <td>Packaging</td>
                                <td>Packaging</td>
                                <td><input type="date"class="value"/></td>
                                <td><input type="date"class="value"/></td>
                                <td><input type="text"class="value"/></td>
                                <td><input type="text"value="ss" class="value"/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="card-body border-bottom">
                <h2 class="border-bottom fs-5 mb-3 pb-2">Quality Control Checklist</h2>
                <div class="g-3 row mb-3">
                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="measurement"/>
                            <label class="form-check-label" for="measurement">Measurements Correct</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="stitching"/>
                            <label class="form-check-label" for="stitching">Stitching Quality</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="color"/>
                            <label class="form-check-label" for="color">Color Matching</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="fabric"/>
                            <label class="form-check-label" for="fabric">Fabric Quality</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="print"/>
                            <label class="form-check-label" for="print">Print Quality</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="wash"/>
                            <label class="form-check-label" for="wash">Wash Test</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="finish"/>
                            <label class="form-check-label" for="finish">Finishing</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="labels"/>
                            <label class="form-check-label" for="labels">Labels & Tags</label>
                        </div>
                    </div>
                </div>
                
                <div class="detail-box">
                    <label>QC Notes</label>
                    <div class="value"></div>
                </div>
            </div>
            
            <div class="card-body border-top text-center pt-4">
                <div class="barcode-img">
                    BARCODE PLACEHOLDER
                </div>
            </div>
            <button onClick={() => addOrder({orderdate: orderdate, deliverydate: deliverydate, customer: customer})}>Submit</button>
        </div>
    </div>
    </>
  )
}

export default JobCard