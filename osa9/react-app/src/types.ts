export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CoursePartDescreptive extends CoursePartBase {
  description: string;
}

export interface CourseNormalPart extends CoursePartDescreptive {
  type: 'normal';
}
export interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartDescreptive {
  type: 'submission';
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CoursePartDescreptive {
  type: 'special';
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;
