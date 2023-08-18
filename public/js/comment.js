const commentFormHandler = async (event) => {
    event.preventDefault();

    let postId = document.querySelector('.comment-form').id;
  
    const content = document.getElementById('#comment-text').value.trim();

    if (content) {
      const response = await fetch(`/api/comments/${postId}`, {
        method: 'post',
        body: JSON.stringify({ content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create comment');
      }
    }
  };
  
  document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);