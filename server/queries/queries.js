const projectQueries = {
    employee: {
        completed: `SELECT * FROM GetProjectsDataByUserFilter($1, 'completed')`,
        inProgress: `SELECT * FROM GetProjectsDataByUserFilter($1, 'progress')`,
        notStarted: `SELECT * FROM GetProjectsDataByUserFilter($1, NULL)`, //null1
    },
    teamlead: {
        completed: `SELECT * FROM GetProjectsDataByTeamleadFilter($1, 'completed')`,
        inProgress: `SELECT * FROM GetProjectsDataByTeamleadFilter($1, 'progress')`,
        notStarted: `SELECT * FROM GetProjectsDataByTeamleadFilter($1, NULL)`,
    }
};

directionQueries = {
    direction: {
        allDirection: 'SELECT * FROM GetAllDirections()',
    },
    stack: {
        allStackByDirection: 'SELECT * FROM GetStacksByDirection($1); ',
    } 
}

module.exports = { projectQueries, directionQueries };