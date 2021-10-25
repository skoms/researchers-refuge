import { act, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { getInitialState, renderComponent } from '../../utils/testing';
import RecommendModule from './RecommendModule';

jest.mock('axios')


const initialState = getInitialState();
const options = {
  needsStore: true,
  preloadedState: {
    ...initialState,
    userAcc: {
      authenticatedUser: {
        id: 1,
        firstName: 'test',
        lastName: 'user'
      }
    }
  }
}

const mockTopics = [
  {
    id: 1,
    name: 'test topic1'
  },
  {
    id: 2,
    name: 'test topic2'
  },
  {
    id: 3,
    name: 'test topic3'
  }
];
const mockArticles = [
  {
    id: 1,
    title: 'test title1'
  },
  {
    id: 2,
    title: 'test title2'
  },
  {
    id: 3,
    title: 'test title3'
  }
];
const mockUsers = [
  {
    id: 1,
    firstName: 'test',
    lastName: 'user1'
  },
  {
    id: 2,
    firstName: 'test',
    lastName: 'user2'
  },
  {
    id: 3,
    firstName: 'test',
    lastName: 'user3'
  },
];

describe('RecommendModule', () => {
  it('should render without any errors', async () => {
    renderComponent(RecommendModule, options);
    expect(
      screen.queryByTestId('recommend-module-component')
    ).toBeInTheDocument();
  });

  it('should render all the tables with data', async () => {
    await axios.mockResolvedValueOnce({
      status: 200,
      data: mockTopics
    });

    await axios.mockResolvedValueOnce({
      status: 200,
      data: mockArticles
    });

    await axios.mockResolvedValueOnce({
      status: 200,
      data: mockUsers
    });
    
    await act( async () => {
      await renderComponent(RecommendModule, options);
    });

    await waitFor(() => {
      expect(
        screen.getAllByText(/recommended/i)
      ).toHaveLength(3);
      expect(
        screen.getAllByRole('cell', { name: /(test topic\d)/i })
      ).toHaveLength(3);
      expect(
        screen.getAllByRole('cell', { name: /(test title\d)/i })
      ).toHaveLength(3);
      expect(
        screen.getAllByRole('cell', { name: /(test user\d)/i })
      ).toHaveLength(3);
    });
  });

  it('should only render topic table with data', async () => {
    await axios.mockResolvedValueOnce({
      status: 200,
      data: mockTopics
    });

    await axios.mockResolvedValueOnce({
      status: 200,
      data: []
    });

    await axios.mockResolvedValueOnce({
      status: 200,
      data: []
    });
    
    await act( async () => {
      await renderComponent(RecommendModule, options);
    });

    await waitFor(() => {
      expect(
        screen.getAllByText(/recommended/i)
      ).toHaveLength(1);
      expect(
        screen.getAllByRole('cell', { name: /(test topic\d)/i })
      ).toHaveLength(3);
    });
  });

  it('should only render articles table with data', async () => {
    await axios.mockResolvedValueOnce({
      status: 200,
      data: []
    });

    await axios.mockResolvedValueOnce({
      status: 200,
      data: mockArticles
    });

    await axios.mockResolvedValueOnce({
      status: 200,
      data: []
    });
    
    await act( async () => {
      await renderComponent(RecommendModule, options);
    });

    await waitFor(() => {
      expect(
        screen.getAllByText(/recommended/i)
      ).toHaveLength(1);
      expect(
        screen.getAllByRole('cell', { name: /(test title\d)/i })
      ).toHaveLength(3);
    });
  });

  it('should only render users table with data', async () => {
    await axios.mockResolvedValueOnce({
      status: 200,
      data: []
    });

    await axios.mockResolvedValueOnce({
      status: 200,
      data: []
    });

    await axios.mockResolvedValueOnce({
      status: 200,
      data: mockUsers
    });
    
    await act( async () => {
      await renderComponent(RecommendModule, options);
    });

    await waitFor(() => {
      expect(
        screen.getAllByText(/recommended/i)
      ).toHaveLength(1);
      expect(
        screen.getAllByRole('cell', { name: /(test user\d)/i })
      ).toHaveLength(3);
    });
  });
})
