import { cleanup, render, screen } from "@testing-library/react";
import { RandomActivity } from "./RandomActivity";

const fakeActivity = {
    activity: 'Random activity that is not too short',
    type: 'useless',
    link: 'https://useles.com'
};

// afterEach(cleanup);

beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => 
    Promise.resolve({
        json: () => Promise.resolve(fakeActivity)
    })
    );
});

test('Show fetched activity', async () => {
    render(<RandomActivity />);
    
    const element = await screen.findByText(fakeActivity.activity);
    console.log(element);

    expect(element).toBeInTheDocument();
})