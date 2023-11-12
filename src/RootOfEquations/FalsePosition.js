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

class FalsePosition extends Component{
  constructor(){
    super();
    console.log("constuctor called");
}
  componentDidMount(){
    console.log("componentDidMount called");
  }  
  calFalsePosition(){
    var equation= document.getElementById("EQUATION").value;
    var xl = document.getElementById("XL").value;
    var xr = document.getElementById("XR").value;
    var xo,x1,fx,error;

    function calf(x){
      fx = eval(equation);
      return fx;
    }
    x1 = ((xl*calf(xr))-(xr*calf(xl)))/(calf(xr)-calf(xl));

    do{
      xo=x1;
      if(calf(x1)*calf(xr)<0){
        xl=x1;
      }
      else if(calf(x1)*calf(xr)>0){
        xr=x1;
      }
      x1 = ((xl*calf(xr))-(xr*calf(xl)))/(calf(xr)-calf(xl));
      error=Math.abs(((x1-xo)/x1)*100);
    }while(error>0.000001);
    console.log(x1);

    document.getElementById("ansEquation").innerHTML=x1;
    document.getElementById("showEquation").innerHTML=equation;
  }
  
  render() {
    console.log("render called")
    return(
      <div ><center>
        <div style={mainDiv}>
          <div style={DIV}>
            
          <br/><h1>False-Position Method</h1>
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
              <Button onClick={this.calFalsePosition}>
              &nbsp;&nbsp;Calculate&nbsp;&nbsp;
              </Button>
            </Form.Group>
          </Form>
          <div>
            <br/><h3>Answer of f(x) = <h id="showEquation"></h> <h> is </h><h id="ansEquation"></h></h3>
          </div>
          </div>
        </div>
        </center>
      </div>
    );
  }
 }
export default FalsePosition;