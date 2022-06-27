import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import QuizHome from './pages/QuizHome';
import * as Constants from './utils/constants';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { act } from "react-dom/test-utils";

const server = setupServer(

    rest.get(Constants.SERVER_QUESTIONNAIRE_API, (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.status(200), ctx.json(
            [
                {
                    "id": 0,
                    "question": "To prepare for a night out...",
                    "options": [
                        {
                            "id": 1,
                            "text": "I buy the latest outfit, tell my friends, then dance the night away."
                        },
                        {
                            "id": 2,
                            "text": "Call a few of my closest friends to see if they will be there."
                        },
                        {
                            "id": 3,
                            "text": "Prepare? My friends have to drag me out most nights."
                        }
                    ]
                },
                {
                    "id": 1,
                    "question": "Being around people makes me feel...",
                    "options": [
                        {
                            "id": 1,
                            "text": "Like I'm alive!"
                        },
                        {
                            "id": 2,
                            "text": "Inspired. I feed off of others' energy but there are times when I'd rather be alone."
                        },
                        {
                            "id": 3,
                            "text": "A bit exhausted. Being around others can be draining."
                        }
                    ]
                },
                {
                    "id": 2,
                    "question": "When given a choice between working as part of a team or working as a group, I would prefer to...",
                    "options": [
                        {
                            "id": 1,
                            "text": "Work with as many people as possible."
                        },
                        {
                            "id": 2,
                            "text": "Work as part of a small group."
                        },
                        {
                            "id": 3,
                            "text": "Work by myself."
                        }
                    ]
                }
            ]))
    })
)

beforeAll(() => {
    server.listen();
})

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('App', () => {
    it('renders Landing Page', async () => {
        render(
            <BrowserRouter>
                <QuizHome />
            </BrowserRouter>
        );
        const title = await screen.getByText('Discover where you fall on the introvert-extrovert spectrum.');
        const getStartedButton = await screen.getByText("Get Started!");
        expect(title).toBeInTheDocument();
        expect(getStartedButton).toBeInTheDocument();

    });

    it('renders loader when waiting for server', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <QuizHome />
                </BrowserRouter>
            );
        });

        const loadingAltText = await screen.getByAltText('loading...');
        expect(loadingAltText).toBeInTheDocument();
    });

    it('renders Questions on server success', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <QuizHome />
                </BrowserRouter>
            );
        });

        await waitFor(() => screen.getByText('To prepare for a night out...'))
        await waitFor(() => screen.getByText('Being around people makes me feel...'))
        await waitFor(() => screen.getByText('When given a choice between working as part of a team or working as a group, I would prefer to...'))
    });

    it('renders Error on server failure', async () => {

        //Mock error from server
        server.use(
            rest.get(Constants.SERVER_QUESTIONNAIRE_API, (req, res, ctx) => {
                return res(
                    // Send a valid HTTP status code
                    ctx.status(403),
                    // And a response body, if necessary
                    ctx.json({
                        errorMessage: `mock error`,
                    }),
                )
            }));

        await act(async () => {
            render(
                <BrowserRouter>
                    <QuizHome />
                </BrowserRouter>
            );
        });

        await waitFor(() => screen.getByText('Something went wrong, Please try again later.'))
    });

    it('shows Error and disabled submit button until all options selected', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <QuizHome />
                </BrowserRouter>
            );
        });

        await waitFor(() => screen.getByText('You have not answered all the questions, please scroll up and answer them all to get your results.'));
        expect(screen.getByText("Let's Go!")).toBeDisabled();
    });

    it('enable submit button on selection of all options', async () => {

        await act(async () => {
            render(
                <BrowserRouter>
                    <QuizHome />
                </BrowserRouter>
            );
        });

        await waitFor(() => screen.getByText('To prepare for a night out...'))
        fireEvent.click(screen.getByText('I buy the latest outfit, tell my friends, then dance the night away.'));
        await waitFor(() => screen.getByText('Being around people makes me feel...'))
        fireEvent.click(screen.getByText('Like I\'m alive!'));
        await waitFor(() => screen.getByText('When given a choice between working as part of a team or working as a group, I would prefer to...'))
        fireEvent.click(screen.getByText('Work with as many people as possible.'));

        expect(screen.getByText("Let's Go!")).toBeEnabled();
    });
});
