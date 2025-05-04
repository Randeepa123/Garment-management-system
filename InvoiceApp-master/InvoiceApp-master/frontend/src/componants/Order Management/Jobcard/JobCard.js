import React, { use, useEffect,useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"; 
import './JobCard.css'
import logo from '../../../../src/asserts/img/logo.png'
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';





function JobCard({
    addOrder,submitted}) {

        const location = useLocation();
        const costEstimationId = location.state?.costEstimationId;

        const [orderdate1, setOrderdate] = useState();
        const [deliverydate1, setDeliverydate] = useState();

        const [customer1, setCustomer] = useState();
        const [priority1, setPriority] = useState();
        const [styleNumber1, setStyleNumber] = useState();
        const [totalQuantity1, setTotalQuantity] = useState(0);
        const [description1, setDescription] = useState();
        const [fabricDetails1, setFabricDetails] = useState();
        const [color1, setColor] = useState();
        const [sizeRange1, setSizeRange] = useState();
        const [isCancelled1,setisCancelled]=useState('')
        const [progress1,setprogress]=useState(0)
        const [status1,setstatus]=useState('')
        const [sizeDistributionS1, setSizeDistributionS] = useState(0);
        const [sizeDistributionM1, setSizeDistributionM] = useState(0);
        const [sizeDistributionL1, setSizeDistributionL] = useState(0);
        const [sizeDistributionXL1, setSizeDistributionXL] = useState(0);
        const [sizeDistribution2XL1, setSizeDistribution2XL] = useState(0);
        const [sizeDistribution3XL1, setSizeDistribution3XL] = useState(0);
        const [measurementNotes1, setmeasurementNotes] = useState();
        const [frontDesignImageUrl1, setFrontDesignImageUrl] = useState();
        const [frontDesignNotes1, setFrontDesignNotes] = useState();
        const [backDesignImageUrl1, setBackDesignImageUrl] = useState();
        const [backDesignNotes1, setBackDesignNotes] = useState();
        const [patternMakingStartDate1, setPatternMakingStartDate] = useState();
        const [patternMakingEndDate1, setPatternMakingEndDate] = useState();
        const [patternMakingSupervisor1, setPatternMakingSupervisor] = useState();
        const [patternMakingStatus1, setPatternMakingStatus] = useState();
        const [cuttingStartDate1, setCuttingStartDate] = useState();
        const [cuttingEndDate1, setCuttingEndDate] = useState();
        const [cuttingSupervisor1, setCuttingSupervisor] = useState();
        const [cuttingStatus1, setCuttingStatus] = useState();
        const [printingStartDate1, setPrintingStartDate] = useState();
        const [printingEndDate1, setPrintingEndDate] = useState();
        const [printingSupervisor1, setPrintingSupervisor] = useState();
        const [printingStatus1, setPrintingStatus] = useState();
        const [sewingStartDate1, setSewingStartDate] = useState();
        const [sewingEndDate1, setSewingEndDate] = useState();
        const [sewingSupervisor1, setSewingSupervisor] = useState();
        const [sewingStatus1, setSewingStatus] = useState();
        const [finishingStartDate1, setFinishingStartDate] = useState();
        const [finishingEndDate1, setFinishingEndDate] = useState();
        const [finishingSupervisor1, setFinishingSupervisor] = useState();
        const [finishingStatus1, setFinishingStatus] = useState();
        const [qualityControlStartDate1, setQualityControlStartDate] = useState();
        const [qualityControlEndDate1, setQualityControlEndDate] = useState();
        const [qualityControlSupervisor1, setQualityControlSupervisor] = useState();
        const [qualityControlStatus1, setQualityControlStatus] = useState();
        const [packagingStartDate1, setPackagingStartDate] = useState();
        const [packagingEndDate1, setPackagingEndDate] = useState();
        const [packagingSupervisor1, setPackagingSupervisor] = useState();
        const [packagingStatus1, setPackagingStatus] = useState();
        const [qcMeasurementsCorrect1, setQcMeasurementsCorrect] = useState();
        const [qcStitchingQuality1, setQcStitchingQuality] = useState();
        const [qcColorMatching1, setQcColorMatching] = useState();
        const [qcFabricQuality1, setQcFabricQuality] = useState();
        const [qcPrintQuality1, setQcPrintQuality] = useState();
        const [qcWashTest1, setQcWashTest] = useState();
        const [qcFinishing1, setQcFinishing] = useState();
        const [qcLabelsAndTags1, setQcLabelsAndTags] = useState();
        const [qcNotes1, setQcNotes] = useState();
        const[wait,setwait]=useState()

        const [total1,settotal1]=useState(0)
        
        const navigate=useNavigate()
        const cancell=()=>{
            navigate("/orders")
        }

        const validateForm = () => {
            // Check essential required fields
            if (!customer1 || customer1.trim() === '') {
              Swal.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Please enter customer name"
              });
              return false;
            }
            //check priority
            if (!priority1 || priority1.trim() === '') {
              Swal.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Priority is not selected"
              });
              return false;
            }
            //check ordertype
            if (!styleNumber1 || styleNumber1.trim() === '') {
              Swal.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Order type is not selected"
              });
              return false;
            }
            if (!description1 || description1.trim() === '') {
              Swal.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Please Enter a Description"
              });
              return false;
            }
            if (!fabricDetails1 || fabricDetails1.trim() === '') {
              Swal.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Please Enter a Fabric Details"
              });
              return false;
            }
            if (!color1 || color1.trim() === '') {
              Swal.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Please Enter a Color Details"
              });
              return false;
            }
            if (!sizeRange1 || sizeRange1.trim() === '') {
              Swal.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Please Enter a size Range"
              });
              return false;
            }
            
            // Check dates
            if (deliverydate1 && orderdate1 && new Date(deliverydate1) < new Date(orderdate1)) {
              Swal.fire({
                icon: "warning",
                title: "Invalid Dates",
                text: "Delivery date cannot be before order date"
              });
              return false;
            }
            
            // Check total quantity
            if (total1 <= 0) {
              Swal.fire({
                icon: "warning",
                title: "Invalid Quantity",
                text: "Total quantity must be greater than 0"
              });
              return false;
            }
            
            return true;
          }

        const total=(S, M, L, XL, XL2, XL3)=>{             
            return S + M + L + XL + XL2 + XL3;
         }

         


        

    useEffect(() => {
        console.log("Status:")
        const caltotal=total(
            parseInt(sizeDistributionS1, 10) || 0,
            parseInt(sizeDistributionM1, 10) || 0,
            parseInt(sizeDistributionL1, 10) || 0,
            parseInt(sizeDistributionXL1, 10) || 0,
            parseInt(sizeDistribution2XL1, 10) || 0,
            parseInt(sizeDistribution3XL1, 10) || 0
        );
        settotal1(caltotal)
    }, [sizeDistributionS1, sizeDistributionM1, sizeDistributionL1, sizeDistributionXL1, sizeDistribution2XL1, sizeDistribution3XL1])

    useEffect(() => {
        console.log("Status:", submitted)
    }, [submitted])

    const getOverallStatus = () => {
            const statuses = [
                patternMakingStatus1,
                cuttingStatus1,
                printingStatus1,
                sewingStatus1,
                finishingStatus1,
                qualityControlStatus1,
                packagingStatus1
            ];
        
            if (statuses.every(status => status === "Completed")) return "Completed";
            if (statuses.some(status => status === "In Progress")) return "In Progress";
            if (statuses.some(status => status === "Delayed")) return "Delayed";
            return "Pending"; // default if none started
    
            
        };
    
        const getPercentage=()=>{
            const status = [
                patternMakingStatus1,
                cuttingStatus1,
                printingStatus1,
                sewingStatus1,
                finishingStatus1,
                qualityControlStatus1,
                packagingStatus1
            ];
    
            const processes = [
                patternMakingStatus1,
                cuttingStatus1,
                printingStatus1,
                sewingStatus1,
                finishingStatus1,
                qualityControlStatus1,
                packagingStatus1
              ];
    
            const completedCount = processes.filter(status => status === "Completed").length;
            const totalCount = processes.length;
            const progressPercentage = (completedCount / totalCount) * 100;
    
            return progressPercentage;
        };
    
        useEffect(() => {
            const value = getPercentage(); 
            setprogress(value);
        }, [
            patternMakingStatus1,
            cuttingStatus1,
            printingStatus1,
            sewingStatus1,
            finishingStatus1,
            qualityControlStatus1,
            packagingStatus1
        ]);
    
        useEffect(() => {
            const statusgetter = getOverallStatus(); 
            setstatus(statusgetter);
        }, [
            patternMakingStatus1,
            cuttingStatus1,
            printingStatus1,
            sewingStatus1,
            finishingStatus1,
            qualityControlStatus1,
            packagingStatus1
        ]);

        console.log("CostEstiID:",costEstimationId);


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
                        <div class="text-secondary fs-5 fw-bold">#GRM-2025-..</div>
                    </div>
                </div>
            </div>
            
            <div class="card-body border-bottom">
                <div class="g-3 row">
                    <div class="col-md-6">
                        <div class="detail-box">
                            <label>Order Date</label>
                            <div><input type="date"class="value" 
                                value={orderdate1}
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
                                value={deliverydate1}
                                onChange={(e) => {
                                    setDeliverydate(e.target.value);
                                }}
                            /></div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="detail-box">
                            <label>Customer</label>
                            <div ><input type="text"class="value" required
                                value={customer1}
                                onChange={(e) => {
                                setCustomer(e.target.value);
                                }}
                            /></div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="detail-box">
                            <label>Priority</label>
                            <td><select 
                                    className="form-select"
                                    value={priority1} 
                                    onChange={(e) => setPriority(e.target.value)}
                                >   
                                    <option value="No data">No-data</option>
                                    <option value="High">High</option>
                                    <option value="Middle">Middle</option>
                                    <option value="Low">Low</option>
                                </select></td>
                            
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="detail-box">
                            <label>Order Type</label>
                            <div ><select
                                class="form-select" 
                                id="sizeRange"  
                                type="text"
                                value={styleNumber1}
                                onChange={(e)=>{
                                    setStyleNumber(e.target.value)
                                }}>
                                <option value="No data">No-data</option>
                                <option value="T-Shirts">T-shirts</option>
                                <option value="Trousers">Trousers</option>
                                <option value="Other">Other</option>

                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="detail-box">
                            <label>Total Quantity</label>
                            <div ><input type="text"class="value"
                                value={total1}
                                readOnly
                                onChange={(e)=>{
                                    setTotalQuantity(e.target.value)
                                }}
                            /></div> 
                        </div>
                    </div>
                    
                    <div class="col-12">
                        <div class="detail-box">
                            <label>Description</label>
                            <div ><input type="text"class="value"
                                value={description1}
                                onChange={(e)=>{
                                    setDescription(e.target.value)
                                }}
                            /></div>
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <div class="detail-box">
                            <label>Fabric Details</label>
                            <div ><input type="text"class="value"
                                value={fabricDetails1}
                                onChange={(e)=>{
                                    setFabricDetails(e.target.value)
                                }}
                            /></div>
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <div class="detail-box">
                            <label>Color</label>
                            <div ><input type="text"class="value"
                                value={color1}
                                onChange={(e)=>{
                                    setColor(e.target.value)
                                }}
                            /></div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="detail-box">
                            <label>Wait</label>
                            <div ><input type="text"class="value"
                                value={wait}
                                onChange={(e)=>{
                                    setwait(e.target.value)
                                }}
                            /></div>
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <div class="detail-box">
                            <label>Size Range</label>
                            <div ><select 
                                    class="form-select" 
                                    id="sizeRange" 
                                    value={sizeRange1} 
                                    onChange={(e) => setSizeRange(e.target.value)}
                                >
                                    <option value="">Select a size range</option>
                                    <option value="XS-S">XS - S</option>
                                    <option value="S-L">S - M</option>
                                    <option value="M-XL">M - L</option>
                                    <option value="L-2XL">L - XL</option>
                                    <option value="s-2XL">XL - 2XL</option>
                                    <option value="s-3XL">2XL - 3XL</option>
                                </select>
                            </div>
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
                                <td>
                                    <div ><input type="text"class="value"
                                        value={sizeDistributionS1}
                                        onChange={(e)=>{
                                        setSizeDistributionS(e.target.value)
                                    }}
                                    /></div>
                                </td>
                                <td>
                                    <div ><input type="text"class="value"
                                        value={sizeDistributionM1}
                                        onChange={(e)=>{
                                            setSizeDistributionM(e.target.value)
                                    }}
                                    /></div>
                                </td>
                                <td>
                                    <div ><input type="text"class="value"
                                        value={sizeDistributionL1}
                                        onChange={(e)=>{
                                        setSizeDistributionL(e.target.value)
                                    }}
                                    /></div>
                                </td>
                                <td>
                                    <div ><input type="text"class="value"
                                        value={sizeDistributionXL1}
                                        onChange={(e)=>{
                                        setSizeDistributionXL(e.target.value)
                                    }}
                                    /></div>
                                </td>
                                <td>
                                    <div ><input type="text"class="value"
                                        value={sizeDistribution2XL1}
                                        onChange={(e)=>{
                                        setSizeDistribution2XL(e.target.value)
                                    }}
                                    /></div>
                                </td>
                                <td>
                                    <div ><input type="text"class="value"
                                        value={sizeDistribution3XL1}
                                        onChange={(e)=>{
                                        setSizeDistribution3XL(e.target.value)
                                    }}
                                    /></div>
                                </td>
                                <td>
                                    <div ><input type="text"class="value"
                                        value={total1}
                                        readOnly
                                    /></div>
                                </td>
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
                    <div ><input type="text"class="value"
                        value={measurementNotes1}
                        onChange={(e)=>{
                        setmeasurementNotes(e.target.value)
                    }}
                    /></div>
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
                                <td><input type="date"class="value"
                                    value={patternMakingStartDate1}
                                    onChange={(e)=>{
                                        setPatternMakingStartDate(e.target.value)
                                }}
                                /></td>
                                <td><input type="date"class="value"
                                    value={patternMakingEndDate1}
                                    onChange={(e)=>{
                                        setPatternMakingEndDate(e.target.value)
                                }}
                                /></td>
                                <td><input type="text"class="value"
                                    value={patternMakingSupervisor1}
                                    onChange={(e)=>{
                                        setPatternMakingSupervisor(e.target.value)
                                }}
                                /></td>
                                <td><select 
                                    className="form-select"
                                    value={patternMakingStatus1} // Ensure this is correctly set in state
                                    onChange={(e) => setPatternMakingStatus(e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Delayed">Delayed</option>
                                </select></td>
                            </tr>
                            <tr>
                                <td>Cutting</td>
                                <td>Cutting</td>
                                <td><input type="date"class="value"
                                    value={cuttingStartDate1}
                                    onChange={(e)=>{
                                        setCuttingStartDate(e.target.value)
                                }}
                                /></td>
                                <td><input type="date"class="value"
                                    value={cuttingEndDate1}
                                    onChange={(e)=>{
                                        setCuttingEndDate(e.target.value)
                                }}
                                /></td>
                                <td><input type="text"class="value"
                                    value={cuttingSupervisor1}
                                    onChange={(e)=>{
                                        setCuttingSupervisor(e.target.value)
                                }}
                                /></td>
                                <td><select 
                                    className="form-select"
                                    value={cuttingStatus1} 
                                    onChange={(e) => setCuttingStatus(e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Delayed">Delayed</option>
                                </select></td>
                            </tr>
                            <tr>
                                <td>Printing</td>
                                <td>Print Shop</td>
                                <td><input type="date"class="value"
                                    value={printingStartDate1}
                                    onChange={(e)=>{
                                        setPrintingStartDate(e.target.value)
                                }}
                                /></td>
                                <td><input type="date"class="value"
                                    value={printingEndDate1}
                                    onChange={(e)=>{
                                        setPrintingEndDate(e.target.value)
                                }}
                                /></td>
                                <td><input type="text"class="value"
                                    value={printingSupervisor1}
                                    onChange={(e)=>{
                                        setPrintingSupervisor(e.target.value)
                                }}
                                /></td>
                                <td><select 
                                    className="form-select"
                                    value={printingStatus1} // Ensure this is correctly set in state
                                    onChange={(e) => setPrintingStatus(e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Delayed">Delayed</option>
                                </select></td>
                            </tr>
                            <tr>
                                <td>Sewing</td>
                                <td>Production</td>
                                <td><input type="date"class="value"
                                    value={sewingStartDate1}
                                    onChange={(e)=>{
                                        setSewingStartDate(e.target.value)
                                }}
                                /></td>
                                <td><input type="date"class="value"
                                    value={sewingEndDate1}
                                    onChange={(e)=>{
                                        setSewingEndDate(e.target.value)
                                }}
                                /></td>
                                <td><input type="text"class="value"
                                    value={sewingSupervisor1}
                                    onChange={(e)=>{
                                        setSewingSupervisor(e.target.value)
                                }}
                                /></td>
                                <td><select 
                                    className="form-select"
                                    value={sewingStatus1} // Ensure this is correctly set in state
                                    onChange={(e) => setSewingStatus(e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Delayed">Delayed</option>
                                </select></td>
                            </tr>
                            <tr>
                                <td>Finishing</td>
                                <td>Finishing</td>
                                <td><input type="date"class="value"
                                    value={finishingStartDate1}
                                    onChange={(e)=>{
                                        setFinishingStartDate(e.target.value)
                                }}
                                /></td>
                                <td><input type="date"class="value"
                                    value={finishingEndDate1}
                                    onChange={(e)=>{
                                        setFinishingEndDate(e.target.value)
                                }}
                                /></td>
                                <td><input type="text"class="value"
                                    value={finishingSupervisor1}
                                    onChange={(e)=>{
                                        setFinishingSupervisor(e.target.value)
                                }}
                                /></td>
                                <td><select 
                                    className="form-select"
                                    value={finishingStatus1} // Ensure this is correctly set in state
                                    onChange={(e) => setFinishingStatus(e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Delayed">Delayed</option>
                                </select></td>
                            </tr>
                            <tr>
                                <td>Quality Control</td>
                                <td>QC</td>
                                <td><input type="date"class="value"
                                    value={qualityControlStartDate1}
                                    onChange={(e)=>{
                                        setQualityControlStartDate(e.target.value)
                                }}
                                /></td>
                                <td><input type="date"class="value"
                                    value={qualityControlEndDate1}
                                    onChange={(e)=>{
                                        setQualityControlEndDate(e.target.value)
                                }}
                                /></td>
                                <td><input type="text"class="value"
                                    value={qualityControlSupervisor1}
                                    onChange={(e)=>{
                                        setQualityControlSupervisor(e.target.value)
                                }}
                                /></td>
                                <td><select 
                                    className="form-select"
                                    value={qualityControlStatus1} // Ensure this is correctly set in state
                                    onChange={(e) => setQualityControlStatus(e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Delayed">Delayed</option>
                                </select></td>
                            </tr>
                            <tr>
                                <td>Packaging</td>
                                <td>Packaging</td>
                                <td><input type="date"class="value"
                                    value={packagingStartDate1}
                                    onChange={(e)=>{
                                        setPackagingStartDate(e.target.value)
                                }}
                                /></td>
                                <td><input type="date"class="value"
                                    value={packagingEndDate1}
                                    onChange={(e)=>{
                                        setPackagingEndDate(e.target.value)
                                }}
                                /></td>
                                <td><input type="text"class="value"
                                    value={packagingSupervisor1}
                                    onChange={(e)=>{
                                        setPackagingSupervisor(e.target.value)
                                }}
                                /></td>
                                <td><select 
                                    className="form-select"
                                    value={packagingStatus1} // Ensure this is correctly set in state
                                    onChange={(e) => setPackagingStatus(e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Delayed">Delayed</option>
                                </select></td>
                            </tr>
                            <tr>
                                <td colSpan="6" className="text-center">
                                    <strong>
                                        Overall Status:{getOverallStatus()}
                                    </strong>
                                    <p>Progress: {getPercentage().toFixed(2)}%</p>
                                </td>
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
                            <input class="form-check-input" type="checkbox" id="measurement"
                                checked={qcMeasurementsCorrect1}
                                onChange={(e)=>{setQcMeasurementsCorrect(e.target.checked)}}
                            />
                            <label class="form-check-label" for="measurement">Measurements Correct</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="stitching"
                                checked={qcStitchingQuality1}
                                onChange={(e)=>{setQcStitchingQuality(e.target.checked)}}
                            />
                            <label class="form-check-label" for="stitching">Stitching Quality</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="color"
                                checked={qcColorMatching1}
                                onChange={(e)=>{setQcColorMatching(e.target.checked)}}
                            />
                            <label class="form-check-label" for="color">Color Matching</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="fabric"
                                checked={qcFabricQuality1}
                                onChange={(e)=>{setQcFabricQuality(e.target.checked)}}
                            />
                            <label class="form-check-label" for="fabric">Fabric Quality</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="print"
                                checked={qcPrintQuality1}
                                onChange={(e)=>{setQcPrintQuality(e.target.checked)}}
                            />
                            <label class="form-check-label" for="print">Print Quality</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="wash"
                                checked={qcWashTest1}
                                onChange={(e)=>{setQcWashTest(e.target.checked)}}
                            />
                            <label class="form-check-label" for="wash">Wash Test</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="finish"
                                checked={qcFinishing1}
                                onChange={(e)=>{setQcFinishing(e.target.checked)}}
                            />
                            <label class="form-check-label" for="finish">Finishing</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="labels"
                                checked={qcLabelsAndTags1}
                                onChange={(e)=>{setQcLabelsAndTags(e.target.checked)}}
                            />
                            <label class="form-check-label" for="labels">Labels & Tags</label>
                        </div>
                    </div>
                </div>
                
                <div class="detail-box">
                    <label>QC Notes</label>
                    <div class="value">
                        <input type="text"class="value"
                            value={qcNotes1}
                            onChange={(e)=>{
                                setQcNotes(e.target.value)
                        }}
                        />
                    </div>
                </div>
            </div>
            <div style= {{display: "flex", gap: "10px", marginTop: "20px", marginBottom: "20px" }}>
                <button type="button" class="btn btn-success" style={ {display: "flex", gap: "10px", marginLeft: "900px", marginTop: "20px", marginBottom: "20px" }}        
                onClick={()=> {
                    if (validateForm()) {
                        console.log(orderdate1)
                        console.log(deliverydate1)
                        const data = {
                            costEstimationId:costEstimationId,
                            orderDate: orderdate1,
                            deliveryDate: deliverydate1,
                            customer: customer1,
                            priority: priority1,
                            styleNumber: styleNumber1,
                            description: description1,
                            fabricDetails: fabricDetails1,
                            color: color1,
                            wait:wait,
                            sizeRange: sizeRange1,
                            progress:progress1,
                            status:status1,
                            sizeDistribution: {
                                S: sizeDistributionS1,
                                M: sizeDistributionM1,
                                L: sizeDistributionL1,
                                XL: sizeDistributionXL1,
                                "2XL": sizeDistribution2XL1,
                                "3XL": sizeDistribution3XL1
                            },
                            measurementNotes: measurementNotes1,
                            frontDesign: {
                                imageUrl: frontDesignImageUrl1,
                                notes: frontDesignNotes1
                            },
                            backDesign: {
                                imageUrl: backDesignImageUrl1,
                                notes: backDesignNotes1
                            },
                            productionTracking: {
                            patternMaking: {
                                startDate: patternMakingStartDate1,
                                endDate: patternMakingEndDate1,
                                supervisor: patternMakingSupervisor1,
                                status: patternMakingStatus1
                            },
                            cutting: {
                                startDate: cuttingStartDate1,
                                endDate: cuttingEndDate1,
                                supervisor: cuttingSupervisor1,
                                status: cuttingStatus1
                            },
                            printing: {
                                startDate: printingStartDate1,
                                endDate: printingEndDate1,
                                supervisor: printingSupervisor1,
                                status: printingStatus1
                            },
                            sewing: {
                                startDate: sewingStartDate1,
                                endDate: sewingEndDate1,
                                supervisor: sewingSupervisor1,
                                status: sewingStatus1
                            },
                            finishing: {
                                startDate: finishingStartDate1,
                                endDate: finishingEndDate1,
                                supervisor: finishingSupervisor1,
                                status: finishingStatus1
                            },
                            qualityControl: {
                                startDate: qualityControlStartDate1,
                                endDate: qualityControlEndDate1,
                                supervisor: qualityControlSupervisor1,
                                status: qualityControlStatus1,
                                checks: {
                                    measurementsCorrect: qcMeasurementsCorrect1,
                                    stitchingQuality: qcStitchingQuality1,
                                    colorMatching: qcColorMatching1,
                                    fabricQuality: qcFabricQuality1,
                                    printQuality: qcPrintQuality1,
                                    washTest: qcWashTest1,
                                    finishing: qcFinishing1,
                                    labelsAndTags: qcLabelsAndTags1,
                                    notes: qcNotes1
                                }
                            },
                            packaging: {
                                startDate: packagingStartDate1,
                                endDate: packagingEndDate1,
                                supervisor: packagingSupervisor1,
                                status: packagingStatus1
                            }},
                            total: total1
                            };

                            const add=addOrder(data);
                            if (add) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success",
                                    text: "Job Card Created",
                                    
                                });
                                } else {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Oops...",
                                        text: "Something went wrong!",
                                        
                                    });
                                }
                    }
                    
                        }
                }
                
                
                >Submit</button>
                <button type="button" class="btn btn-danger"style={ {display: "flex", gap: "10px", marginTop: "20px", marginBottom: "20px" }} 
                onClick={() => cancell()} 
                  
                >Cancell</button>
            </div>              
        </div>
        </div>
    </>
  )
}

export default JobCard