export const Contact = () => {
    return (
        <section className="contact_section layout_padding">
        <div className="container contact_heading">
          <h2>
            Contact Us
          </h2>
          <p>
            psum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </p>
        </div>
        <div className="container">
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputName4">Name</label>
                <input type="text" className="form-control" id="inputName4"/>
              </div>
              <div className="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input type="email" className="form-control" id="inputEmail4"/>
              </div>
    
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputNumber4">Phone number</label>
                <input type="tel" className="form-control" id="inputNumber4"/>
              </div>
              <div className="form-group col-md-6">
                <label for="inputState">Select Service</label>
                <select id="inputState" className="form-control">
                  <option selected=""></option>
                  <option>...</option>
                </select>
              </div>
    
            </div>
            <div className="form-group">
              <label for="inputMessage">Message</label>
              <input type="text" className="form-control" id="inputMessage" placeholder=""/>
            </div>
        
    
        <div className="d-flex justify-content-center">
          <button type="submit" className="">Send</button>
        </div>
        </form>
        </div>
        
      </section>
    )
};