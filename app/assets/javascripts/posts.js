document.addEventListener('DOMContentLoaded', () => {
  const handleEditClick = e => {
    document.getElementById(
      `edit_post_${e.target.dataset.post}`
    ).style.display = 'flex';
    document.getElementById(
      `show-text-${e.target.dataset.post}`
    ).style.display = 'none';
  };

  const handleCancelClick = e => {
    document.getElementById(
      `edit_post_${e.target.dataset.post}`
    ).style.display = 'none';
    document.getElementById(
      `show-text-${e.target.dataset.post}`
    ).style.display = 'inline';
  };

  Array.prototype.forEach.call(
    document.getElementsByClassName('edit'),
    element => {
      element.addEventListener('click', handleEditClick);
    }
  );

  Array.prototype.forEach.call(
    document.getElementsByClassName('cancel'),
    element => {
      element.addEventListener('click', handleCancelClick);
    }
  );
});
