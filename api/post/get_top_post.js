const errorUtils = require('@utils/error');
const router = require('express').Router();
const axios = require('axios');
const moment = require('moment');

module.exports = (function () {
  router.get(
    '/',
    errorUtils.catchAsync(async (req, res, next) => {
      let startTime = moment();

      let result = [];

      let getAllCommentApiResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/comments`
      );

      let getAllPostApiResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      );

      if (getAllCommentApiResponse.data && getAllPostApiResponse.data) {
        result = getAllPostApiResponse.data
          .map((post) => {
            let total_number_of_comments = getAllCommentApiResponse.data.filter(
              (c) => c.postId == post.id
            ).length;
            return {
              post_id: post.id,
              post_title: post.title,
              post_body: post.body,
              total_number_of_comments,
            };
          })
          .sort(
            (a, b) => b.total_number_of_comments - a.total_number_of_comments
          );
      }

      let endTime = moment();

      return res.json({
        status_code: 200,
        duration: `${endTime.diff(startTime)}ms`,
        count: result.length,
        data: result,
      });
    })
  );
  return router;
})();
