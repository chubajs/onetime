import React, { useState, useEffect } from 'react';

const ServerImage = () => {
  const [serverImage, setServerImage] = useState(null);

  useEffect(() => {
    const fetchImage = () => {
      setServerImage(`/api/current_emoji.png?t=${new Date().getTime()}`);
    };

    fetchImage();
 