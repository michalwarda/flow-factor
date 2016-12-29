// @flow
import {tokenAt, extractVariable, parse, expressionAt} from '../src/main'
import * as exampleCode from './fixtures'

test('tokenAt', () => {
  const ast = parse(exampleCode.binaryExpression)
  expect(tokenAt(ast, 1, 1).value).toEqual(5)
  expect(tokenAt(ast, 1, 5).value).toEqual(2)

  const ast2 = parse(exampleCode.multiLineExpression)
  expect(tokenAt(ast2, 2, 1).value).toEqual(5)
  expect(tokenAt(ast2, 3, 1).value).toEqual('const')
  expect(tokenAt(ast2, 3, 2).value).toEqual('const')
  expect(tokenAt(ast2, 3, 7).value).toEqual('name')
  expect(tokenAt(ast2, 3, 14).value).toEqual(5)
})

test('expressionAt', () => {
  const ast = parse(exampleCode.binaryExpression)
  const selection = {start: {line: 1, column: 0}, end: {line: 1, column: 1}}
  expect(expressionAt(ast, selection).type).toEqual('NumericLiteral')
  const anotherSelection = {start: {line: 1, column: 0}, end: {line: 1, column: 5}}
  expect(expressionAt(ast, anotherSelection).type).toEqual('BinaryExpression')
})

test('extractVariable', () => {
  let location
  location = {start: {line: 1, column: 1}, end: {line: 1, column: 1}}
  expect(extractVariable(exampleCode.binaryExpression, location, 'let', 'number').getSourceCode()).toMatchSnapshot()
  location = {start: {line: 1, column: 5}, end: {line: 1, column: 5}}
  expect(extractVariable(exampleCode.binaryExpression, location, 'let', 'number').getSourceCode()).toMatchSnapshot()
  location = {start: {line: 1, column: 5}, end: {line: 1, column: 5}}
  expect(extractVariable(exampleCode.binaryExpressionString, location, 'let', 'string').getSourceCode()).toMatchSnapshot()
  location = {start: {line: 1, column: 10}, end: {line: 1, column: 10}}
  expect(extractVariable(exampleCode.binaryExpressionString, location, 'const', 'text').getSourceCode()).toMatchSnapshot()
  location = {start: {line: 1, column: 10}, end: {line: 1, column: 10}}
  expect(extractVariable(exampleCode.binaryExpressionString, location, 'var', 'varText').getSourceCode()).toMatchSnapshot()
  location = {start: {line: 1, column: 6}, end: {line: 1, column: 6}}
  expect(extractVariable(exampleCode.binaryExpressionString, location, 'let', 'addition').getSourceCode()).toMatchSnapshot()
  location = {start: {line: 1, column: 1}, end: {line: 1, column: 13}}
  expect(extractVariable(exampleCode.binaryExpressionString, location, 'let', 'addition').getSourceCode()).toMatchSnapshot()
  location = {start: {line: 1, column: 0}, end: {line: 1, column: 13}}
  expect(extractVariable(exampleCode.binaryExpressionString, location, 'let', 'addition').getSourceCode()).toMatchSnapshot()
})
