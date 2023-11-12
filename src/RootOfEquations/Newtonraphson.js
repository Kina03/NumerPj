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

class NewtonRaphson extends Component{
  constructor(){
    super();
    console.log("constuctor called");
}
  componentDidMount(){
    console.log("componentDidMount called");
  }  
  calNewtonRaphson(){
     var equation = document.getElementById("EQUATION").value;
     var diffequation = document.getElementById("DIFFERENTIAL_EQUATION").value;
     var x = document.getElementById("x").value;
     var xo,x1,fx,dfx,error;
    
     fx = eval(equation);
     dfx = eval(diffequation);
     x1 = x-(Number(fx)/Number(dfx));
    
     do{
        xo = x1;
        x = xo;
        fx = eval(equation);
        dfx = eval(diffequation);
        x1 = xo-(fx/dfx);
        error = Math.abs((x1-xo)/x1)*100;
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
            
              <br/><h1>Newton-Raphson Method</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                Input value
              </Form.Label>

              <div>
              <p><Form.Control id="EQUATION" type="text" step="1" placeholder="Equation" style={{width:"20%",margin : "0 auto"}} ></Form.Control></p>
              <p><Form.Control id="DIFFERENTIAL_EQUATION" type="text" step="1" placeholder="Differential Equation" style={{width:"20%",margin : "0 auto"}} ></Form.Control></p>
              <p><Form.Control id="x" type="number" step="1" placeholder="Input x" style={{width:"20%",margin : "0 auto"}} ></Form.Control></p>
                
            </div>
             <Button onClick={this.calNewtonRaphson}>
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
export default NewtonRaphson; 