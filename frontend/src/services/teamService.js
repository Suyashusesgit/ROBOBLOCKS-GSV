import API from './api';

const teamService = {
    // Create a new team (with file upload support)
    registerTeam: async (formData) => {
        const response = await API.post('/teams', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getSiteContent: async () => {
        const response = await API.get('/content');
        return response.data;
    },

    // Get logged-in user's team
    getMyTeam: async () => {
        const response = await API.get('/teams/me');
        return response.data;
    },

    // Get all teams (Admin only)
    getAllTeams: async () => {
        const response = await API.get('/teams/public');
        return response.data;
    },

    // Update team status (Admin only)
    updateTeamStatus: async (id, status) => {
        const response = await API.put(`/teams/${id}/status`, { status });
        return response.data;
    },

    // Upload submission file
    uploadSubmission: async (teamId, file, type) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);

        const response = await API.post(`/teams/${teamId}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Update site content (Admin only)
    updateContent: async (contentData) => {
        const response = await API.put('/content', contentData);
        return response.data;
    }
};

export default teamService;
