package codefresh

import (
	"github.com/codefresh-io/go/venona/pkg/task"
	"github.com/stretchr/testify/mock"
)

// Codefresh is an autogenerated mock type for the Codefresh type
type MockCodefresh struct {
	mock.Mock
}

// Host provides a mock function with given fields:
func (_m *MockCodefresh) Host() string {
	ret := _m.Called()

	var r0 string
	if rf, ok := ret.Get(0).(func() string); ok {
		r0 = rf()
	} else {
		r0 = ret.Get(0).(string)
	}

	return r0
}

// ReportStatus provides a mock function with given fields: status
func (_m *MockCodefresh) ReportStatus(status AgentStatus) error {
	ret := _m.Called(status)

	var r0 error
	if rf, ok := ret.Get(0).(func(AgentStatus) error); ok {
		r0 = rf(status)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// Tasks provides a mock function with given fields:
func (_m *MockCodefresh) Tasks() ([]task.Task, error) {
	ret := _m.Called()

	var r0 []task.Task
	if rf, ok := ret.Get(0).(func() []task.Task); ok {
		r0 = rf()
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]task.Task)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func() error); ok {
		r1 = rf()
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}