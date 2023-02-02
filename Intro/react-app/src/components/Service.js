import { ServiceBox } from "./ServiceBox";

export const Service = () => {
    return (
        <section className="service_section">
        <div className="container">
          <div className="custom_heading-container">
            <h2>
              Our Services
            </h2>
          </div>
          <div className="service_container layout_padding2">
            <ServiceBox src="images/s-3.jpg" />

            <ServiceBox src="images/s-2.jpg" />
            
            <ServiceBox src="images/s-1.jpg" />

          </div>
          <div>
            <a href="">
              Read More
            </a>
          </div>
        </div>
      </section>
    )
};