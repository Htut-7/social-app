"use client";

import React, { useState } from "react";

function EditPost() {
  const [content, setContent] = useState();

  return (
    <div>
      <h2>Edit Post</h2>
      <form>
        <label>Edit Content</label>
        <textarea placeholder="Edit Content" />
      </form>
    </div>
  );
}

export default EditPost;
