/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';
// home dashboard
const AsyncHomeDashboardComponent = Loadable({
   loader: () => import("Routes/dashboard/home"),
   loading: () => <RctPageLoader />,
});
const AsyncClientHomeDashboardComponent = Loadable({
   loader: () => import("Routes/dashboard/client-home"),
   loading: () => <RctPageLoader />,
});


// education programs 

const AsyncEducationProgramComponent = Loadable({
   loader: () => import("Routes/EducationProgram/AsyncEducationProgramsComponent"),
   loading: () => <RctPageLoader />,
});

const AsyncEducationProgramDetailComponent = Loadable({
   loader: () => import("Routes/EducationProgram/AsyncEducationProgramsComponent"),
   loading: () => <RctPageLoader />
});

// student listZ
const AsyncStudentComponent = Loadable({
   loader: () => import('Routes/Student/Components'),
   loading: () => <RctPageLoader />
});

// class
const AsyncYearClassComponent = Loadable({
   loader: () => import('Routes/Class/Components'),
   loading: () => <RctPageLoader />
});

//teacher
 const AsyncTeachersComponent = Loadable({
   loader: () => import('Routes/Teachers/Components'),
   loading: () => <RctPageLoader />
});

//schedule
const AsyncScheduleComponent = Loadable({
   loader: () => import('Routes/Schedule/Components'),
   loading: () => <RctPageLoader />
});

//login
const AsyncAdminLoginComponent = Loadable({
   loader: () => import('Routes/login'),
   loading: () => <RctPageLoader />
});


//error
const AsyncSessionPage404Component = Loadable({
   loader: () => import('Routes/session/404'),
   loading: () => <RctPageLoader />
});
const AsyncSessionPage500Component = Loadable({
   loader: () => import('Routes/session/500'),
   loading: () => <RctPageLoader />
});

//forgot pass
const AsyncForgotPassComponent = Loadable({
   loader: () => import('Routes/session/forgot-password'),
   loading: () => <RctPageLoader />
});


export {
   //student
   AsyncStudentComponent,
   
   AsyncEducationProgramDetailComponent,
   AsyncEducationProgramComponent,

   //class
   AsyncYearClassComponent,

   //teachers
   AsyncTeachersComponent,
   
   //schedule
   AsyncScheduleComponent,
   AsyncForgotPassComponent,
   AsyncHomeDashboardComponent,
   AsyncAdminLoginComponent,
   AsyncSessionPage404Component,
   AsyncSessionPage500Component,
   AsyncClientHomeDashboardComponent
};