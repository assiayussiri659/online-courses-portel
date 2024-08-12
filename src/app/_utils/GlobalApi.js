const axios = require('axios');
const { NEXT_PUBLIC_HYGRAPH_API_KEY } = require('../../../config');

const MASTER_URL = `https://ap-south-1.cdn.hygraph.com/content/${NEXT_PUBLIC_HYGRAPH_API_KEY}/master`

const getAllCourseList = async () => {
  const query = `
    {
  courseLists(first: 10, orderBy: id_DESC) {
    author
    name
    id
    free
    description
    demoUrl
    banner {
      url
    }
    chapter {
      ... on Chapter {
        id
        name
        video {
          url
        }
      }
    }
    totalChapter
    sorceCode
    tag
    slug
  }
}`;

  try {
    const response = await axios.post(MASTER_URL, {
      query: query
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching course list:', error);
    throw error;
  }
}

async function getGitSideBanner() {
  const query = `
    query GitSideBanner {
        sideBanners {
            id
            name
            banner {
                id
                url
            }
            url
        }
    }`;

  try {
    const response = await axios.post(MASTER_URL, {
      query: query
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching side banner:', error);
    throw error;
  }
}

const getCourseById = async (courseId) => {
  const query = `
  query MyQuery {
  courseList(where: {slug: "`+ courseId + `"}) {
    author
    banner {
      url
    }
    chapter {
      ... on Chapter {
        id
        name
        video {
          url
        }
      }
    }
    demoUrl
    description
    free
    id
    name
    slug
    sorceCode
    tag
    totalChapter
  }
}
  `
  try {
    const response = await axios.post(MASTER_URL, {
      query: query
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching side banner:', error);
    throw error;
  }
}


const enrollToCourse = async (courseId, email) => {
  const query = `mutation MyMutation {
  createUserEnrollCourse(
    data: {courseld: "`+ courseId +`", userEmail: "`+ email +`", courseList: {connect: {slug: "`+ courseId +`"}}}
  ) {
    id
}
    publishManyUserEnrollCoursesConnection {
    edges {
      node {
        id
      }
  }
}
}
`
  try {
    const response = await axios.post(MASTER_URL, {
      query: query
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching side banner:', error);
    throw error;
  }
}



module.exports = {
  getAllCourseList,
  getGitSideBanner,
  getCourseById,
  enrollToCourse
};
