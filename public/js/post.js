document.addEventListener('DOMContentLoaded', () => {
  // Function to create a new post
  const createPost = async (title, content) => {

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        // Post created successfully, you can handle this as needed
        window.location.reload(); // Reload the page to display the new post
      } else {
        throw new Error('Failed to create a post');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle form submission for creating a new post
  const createPostForm = document.querySelector('#createPostForm');
  createPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    createPost(title, content);
  });
});
