import {React,Component} from 'react';
import { Button } from 'react-bootstrap';
import Form from "react-bootstrap/Form";

const mainDiv = {
    display:"flex",
    width:"100%",
    margin:"0 auto",
};
const DIV ={
  width:"100%",
  margin:"0 auto",
};

class Bisection extends Component{
  constructor(){
    super();
    console.log("constuctor called");
  }
  componentDidMount(){
    console.log("componentDidMount called");
  }  
  calBisection(){
    var equation= document.getElementById("EQUATION").value;
    var xl = document.getElementById("XL").value;
    var xr = document.getElementById("XR").value;
    var fx,xo,error,xm;

    function calf(x){
      fx = eval(equation);
      return fx;
    }
    xm=(xl+xr)/2;
    do{
      xo=xm;
      if(calf(xm)*calf(xr)<0){
        xl=xm;
      }
      else if(calf(xm)*calf(xr)>0){
        xr=xm;
      }
      xm=(xl+xr)/2;
      error=Math.abs(((xm-xo)/xm)*100);
    }while(error>0.000001);
    console.log(xm);

    document.getElementById("ansEquation").innerHTML=xm;
    document.getElementById("showEquation").innerHTML=equation;
  }
  
  render() {
    console.log("render called")
    return(
      <center><div >
        <div style={mainDiv}>
          <div style={DIV}>
            
          <br/><h1>Bisection Method</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                Input value
              </Form.Label>

              <div>
              <p><Form.Control id="EQUATION" type="text" step="1" placeholder="Equation" style={{width:"20%",margin : "0 auto"}} ></Form.Control></p>
              <p><Form.Control id="XL" type="number" step="1" placeholder="Input XL" style={{width:"20%",margin : "0 auto"}} ></Form.Control></p>
              <p><Form.Control id="XR" type="number" step="1" placeholder="Input XR" style={{width:"20%",margin : "0 auto"}} ></Form.Control></p>
              </div>

              <Button onClick={this.calBisection}>
              &nbsp;&nbsp;Calculate&nbsp;&nbsp;
              </Button>
            </Form.Group>
          </Form>
          <div>

            <h3><br/>Answer of f(x) = <h id="showEquation"></h> <h> is </h><h id="ansEquation"></h></h3>
          </div>
          </div>
        </div>
      </div>
  
      </center>
      
    );
    
  }
  

}
export default Bisection;