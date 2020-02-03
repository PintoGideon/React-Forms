import React from 'react';
import Core from '../api/core.json';
import Electives from '../api/electives.json';

const Courses = {
	core: Core,
	electives: Electives
};

class CourseSelect extends React.Component {
	state = {
		department: null,
		course: null,
		courses: [],
		_loading: false
	};

	static getDerivedStateFromProps(update) {
		console.log('Update', update);
		return {
			department: update.department,
			course: update.course
		};
	}

	onSelectDepartment = evt => {
		const department = evt.target.value;
		console.log(department);

		this.setState({
			department
		});

		this.props.onChange({ name: 'department', value: department });

		if (department) this.fetch(department);
	};
	onSelectCourse = evt => {
		const course = evt.target.value;
		this.setState({ course });
		this.props.onChange({ name: 'course', value: course });
	};

	fetch = department => {
		this.setState({ _loading: true, courses: [] });
		apiClient(department).then(courses => {
			this.setState({
				_loading: false,
				courses: courses
			});
		});
	};

	renderDepartmentSelect = () => {
		return (
			<select
				onChange={this.onSelectDepartment}
				value={this.state.department || ''}
			>
				<option value="">Which department?</option>
				<option value="core">NodeSchool: Core</option>
				<option value="electives">NodeSchool: Electives</option>
			</select>
		);
	};

	renderCourseSelect = () => {
		if (this.state._loading) {
			return <img alt="loading" src="/img/loading.gif" />;
		}

		return (
			<select onChange={this.onSelectCourse} value={this.state.course || ''}>
				{[
					<option value="" key="course-none">
						Which course?
					</option>,

					...this.state.courses.map((course, i) => (
						<option value={course} key={i}>
							{course}
						</option>
					))
				]}
			</select>
		);
	};

	render() {
		return (
			<div>
				{this.renderDepartmentSelect()}
				<br />
				{this.renderCourseSelect()}
			</div>
		);
	}
}

function apiClient(department) {
	return {
		then: function(cb) {
			setTimeout(() => {
				cb(Courses[department]);
			}, 1000);
		}
	};
}

export default CourseSelect;
