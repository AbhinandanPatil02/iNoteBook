// import { useContext } from "react"
import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'


function About() {

  return (
    <div class="card">
  <div class="card-header">
   <h1>About Us</h1> 
  </div>
  <div class="card-body">
    <blockquote class="blockquote mb-0">
    <p>
  Welcome to our project! Our project is a note-taking web application designed to help users organize their thoughts, tasks, and ideas effectively. With our intuitive and user-friendly interface, users can easily create, edit, and delete notes to keep track of important information.
</p>
<p>
  Key features of our project include:
</p>
<ul>
  <li><strong>Secure Authentication:</strong> We prioritize the security of our users' data by implementing a robust authentication system. Users can sign up for an account securely and log in to access their notes.</li>
  <li><strong>Note Management:</strong> Our application allows users to create, edit, and delete notes effortlessly. Users can categorize their notes using tags for better organization and quick retrieval.</li>
  <li><strong>Real-time Updates:</strong> Users can expect real-time updates to their notes without having to refresh the page. This ensures a seamless experience and instant synchronization across devices.</li>
  <li><strong>Responsive Design:</strong> Our project is built with responsiveness in mind, ensuring a consistent and optimal experience across various devices and screen sizes.</li>
  <li><strong>Customization Options:</strong> Users can personalize their note-taking experience by choosing from a range of customization options, such as themes, fonts, and layouts.</li>
  <li><strong>Collaboration Features:</strong> For users working in teams or groups, our project offers collaboration features that allow for sharing and editing notes with colleagues or friends.</li>
  <li><strong>Data Privacy:</strong> We prioritize the privacy of our users' data and adhere to strict data protection measures. Users can trust that their notes are stored securely and handled with care.</li>
</ul>
<p>
  Whether you're a student, professional, or anyone in need of a reliable note-taking solution, our project aims to simplify your workflow and enhance productivity. Join us today and start taking better notes effortlessly!
</p>

      <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
    </blockquote>
  </div>
</div>
  )
}

export default About
